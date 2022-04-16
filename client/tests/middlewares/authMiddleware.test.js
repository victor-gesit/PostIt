import sinon from 'sinon';
import { authMiddleware } from '../../middlewares';
import { googleLogin, signIn, signUp,
  recoverPassword, resetPassword
} from '../../actions';

jest.mock('superagent');

describe('<authMiddleware middleware/>', () => {
  it('passes on an action to sign in a user', () => {
    const next = sinon.spy().withArgs({ type: 'SIGN_IN_SUCCESS',
      user: {} });
    authMiddleware({})(next)(signIn());
    expect(next.withArgs({ type: 'SIGN_IN_SUCCESS', user: {} })
      .called).toEqual(true);
  });
  it('passes on an action to sign up a user', () => {
    const next = sinon.spy().withArgs({ type: 'SIGN_UP_SUCCESS',
      user: {} });
    authMiddleware({})(next)(signUp());
    expect(next.withArgs({ type: 'SIGN_UP_SUCCESS', user: {} })
      .called).toEqual(true);
  });
  it('passes on an action to sign in a user with google', () => {
    const next = sinon.spy().withArgs({ type: 'GOOGLE_LOGIN_SUCCESS',
      success: true,
      message: 'Signed In',
      user: { id: '12345', name: 'Me You' }
    });
    authMiddleware({})(next)(googleLogin());
    expect(next.withArgs({ type: 'GOOGLE_LOGIN_SUCCESS',
      success: true,
      message: 'Signed In',
      user: { id: '12345', name: 'Me You' }
    }).called).toEqual(true);
  });
  it('passes on an action to send password recovery email to a user', () => {
    const next = sinon.spy().withArgs({ type: 'RECOVER_PASSWORD_SUCCESS',
      success: true,
      message: 'Recovery email sent',
    });
    authMiddleware({})(next)(recoverPassword('lostpassword@me.com'));
    expect(next.withArgs({ type: 'RECOVER_PASSWORD_SUCCESS',
      success: true,
      message: 'Recovery email sent',
    }).called).toEqual(true);
  });
  it('passes on an action to reset password for a user', () => {
    const next = sinon.spy().withArgs({ type: 'RESET_PASSWORD_SUCCESS',
      success: true,
      message: 'Password Reset Successful',
      token: 'newToken'
    });
    authMiddleware({})(next)(resetPassword('newPassword', 'validToken'));
    expect(next.withArgs({ type: 'RESET_PASSWORD_SUCCESS',
      success: true,
      message: 'Password Reset Successful',
      token: 'newToken'
    }).called).toEqual(true);
  });
  it('passes on all actions by default', () => {
    const next = sinon.spy().withArgs({ type: 'UNREGISTERED_PASSED' });
    authMiddleware({})(next)({ type: 'UNREGISTERED' });
    expect(next.withArgs({ type: 'UNREGISTERED_PASSED' })
      .called).toEqual(true);
  });
});
