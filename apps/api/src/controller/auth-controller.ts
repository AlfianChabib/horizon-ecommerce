import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { callbackHelper } from '../helper/auth/social-helper';
import { AuthService } from '../service/auth-service';
import { EmailType, sendEmail } from '../helper/email/email-helper';
import { CompleteRegisterPayload, LoginPayload, RegisterEmail } from '../model/auth-model';
import { sendRefreshToken } from '../helper/jwt/token-helper';
import { IParsedToken } from '../types/jwt';
import { ResponseError } from '../helper/response-error';
import { User } from '@prisma/client';

export class AuthController {
  async registerEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body as RegisterEmail;

      const response = await AuthService.registerEmail({ email });

      if (response) {
        await sendEmail(EmailType.VERIFY_EMAIL, {
          email: response.email,
          url: response.url,
        });
        return res.status(200).json({
          success: true,
          message: 'Please check your email to continue register your account',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async checkVerifyExpired(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body as { token: string };
      const response = await AuthService.checkVerifyExpired(token);

      if (response) {
        return res.status(200).json({ success: true, message: response.message });
      } else {
        return res.status(400).json({ success: false, message: 'This url has been expired' });
      }
    } catch (error) {
      next(error);
    }
  }

  async completeRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: CompleteRegisterPayload = req.body;

      await AuthService.registerComplete(payload);

      res.status(200).json({
        success: true,
        message: 'Register successfully, login to your account',
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: LoginPayload = req.body;

      const { accessToken, refreshToken, user } = await AuthService.login(payload);

      await sendRefreshToken(res, refreshToken);
      const EXPIRE_TIME = 20 * 1000;

      res.status(200).json({ success: true, accessToken, refreshToken });
      // return res.status(200).json({
      //   success: true,
      //   user,
      //   backendToken: { accessToken, refreshToken, expiresIn: new Date(Date.now() + EXPIRE_TIME) },
      // });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as IParsedToken;
      const token = req.cookies['refreshToken'];

      if (!token) throw new ResponseError(401, 'Unauthorized');

      await AuthService.logout(user, token);

      res.clearCookie('refreshToken');
      return res.status(200).json({ success: true, message: 'Logout successfully' });
    } catch (error) {
      next(error);
    }
  }

  async refreshNewToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies['refreshToken'];
      if (!token) throw new ResponseError(401, 'Unauthorized');

      const { accessToken } = await AuthService.refreshNewToken(token);

      return res.status(200).json({ success: true, accessToken });
    } catch (error) {
      next(error);
    }
  }

  async session(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as IParsedToken;

      const data = await AuthService.getSession(userId);

      return res.status(200).json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  }

  async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      passport.authenticate('google', async (err: Error, user: User) => {
        callbackHelper(user, err, res, next);
      })(req, res);
    } catch (error) {
      next(error);
    }
  }
}
