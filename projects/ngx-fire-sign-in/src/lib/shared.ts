import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
export enum NgxFireSignInScreen {
  wait = 'wait',
  home = 'home',
  signIn = 'signIn',
  signUp = 'signUp',
  signOut = 'signOut',
  resetPassword = 'resetPassword',
  verifyEmail = 'verifyEmail',
  changeEmail = 'changeEmail',
  changePassword = 'changePassword',
  oobResetPassword = 'oobResetPassword',
  oobRecoverEmail = 'oobRecoverEmail',
  oobVerifyEmail = 'oobVerifyEmail',
  oobError = 'oobError'
}

export interface INgxFireSignInController {
  successMessage: string;
  user: User;
  email: string;
  oobCode: string;
  oobInfo: auth.ActionCodeInfo;
  showUnhandledError: (error: auth.Error) => void;
  showOobError: (error: auth.Error, message: string) => void;
  showOobSuccess: (info: auth.ActionCodeInfo, message: string) => void;
  showSignInSuccess: (cred: auth.UserCredential, message: string) => void;
  showSignIn: (message?: string) => void;
  showHome: () => void;
}
