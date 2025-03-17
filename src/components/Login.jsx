import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  // 登录方式切换状态
  const [loginType, setLoginType] = useState('email'); // 'email' 或 'phone'

  // 邮箱登录相关状态
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 手机号登录相关状态
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [countdown, setCountdown] = useState(0);

  // 倒计时效果
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 邮箱验证函数
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // 手机号验证函数
  const validatePhone = (phone) => {
    const re = /^1[3-9]\d{9}$/;
    return re.test(phone);
  };

  // 发送验证码
  const sendVerificationCode = () => {
    // 验证手机号
    if (!phone) {
      setPhoneError('请输入手机号码');
      return;
    } else if (!validatePhone(phone)) {
      setPhoneError('请输入有效的手机号码');
      return;
    }

    // 重置错误信息
    setPhoneError('');

    // 模拟发送验证码
    console.log('发送验证码到手机:', phone);
    // 设置倒计时
    setCountdown(60);

    // 这里可以调用API发送验证码
    // sendSmsCode(phone);
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (loginType === 'email') {
      // 重置错误信息
      setEmailError('');
      setPasswordError('');

      // 验证邮箱
      if (!email) {
        setEmailError('请输入邮箱地址');
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError('请输入有效的邮箱地址');
        isValid = false;
      }

      // 验证密码
      if (!password) {
        setPasswordError('请输入密码');
        isValid = false;
      } else if (password.length < 6) {
        setPasswordError('密码长度至少为6个字符');
        isValid = false;
      }

      if (isValid) {
        // 在这里处理邮箱登录逻辑
        console.log('邮箱登录信息', { email, password, rememberMe });
        // 可以调用API进行登录验证
        // loginWithEmail(email, password, rememberMe);
      }
    } else {
      // 重置错误信息
      setPhoneError('');
      setCodeError('');

      // 验证手机号
      if (!phone) {
        setPhoneError('请输入手机号码');
        isValid = false;
      } else if (!validatePhone(phone)) {
        setPhoneError('请输入有效的手机号码');
        isValid = false;
      }

      // 验证验证码
      if (!verificationCode) {
        setCodeError('请输入验证码');
        isValid = false;
      } else if (verificationCode.length !== 6) {
        setCodeError('验证码应为6位数字');
        isValid = false;
      }

      if (isValid) {
        // 在这里处理手机号登录逻辑
        console.log('手机号登录信息', { phone, verificationCode });
        // 可以调用API进行登录验证
        // loginWithPhone(phone, verificationCode);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              E
            </div>
            <h2 className="ml-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Eric技术圈
            </h2>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">登录</h1>
          <p className="mt-2 text-sm text-gray-600">
            请输入您的账号信息进行登录
          </p>
        </div>

        {/* 登录方式切换 */}
        <div className="flex rounded-md shadow-sm p-1 bg-gray-100">
          <button
            type="button"
            onClick={() => setLoginType('email')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              loginType === 'email'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            邮箱登录
          </button>
          <button
            type="button"
            onClick={() => setLoginType('phone')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              loginType === 'phone'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            手机号登录
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {loginType === 'email' ? (
              // 邮箱登录表单
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    邮箱地址
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        emailError ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="your@example.com"
                    />
                    {emailError && (
                      <p className="mt-1 text-sm text-red-600">{emailError}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    密码
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        passwordError ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="••••••••"
                    />
                    {passwordError && (
                      <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      记住密码
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      忘记密码?
                    </a>
                  </div>
                </div>
              </>
            ) : (
              // 手机号登录表单
              <>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    手机号码
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      +86
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        phoneError ? 'border-red-300' : 'border-gray-300'
                      } rounded-none rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="请输入手机号码"
                    />
                  </div>
                  {phoneError && (
                    <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700">
                    验证码
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      id="verification-code"
                      name="verification-code"
                      type="text"
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        codeError ? 'border-red-300' : 'border-gray-300'
                      } rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="请输入验证码"
                    />
                    <button
                      type="button"
                      onClick={sendVerificationCode}
                      disabled={countdown > 0}
                      className={`inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md ${
                        countdown > 0
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-white text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      {countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码'}
                    </button>
                  </div>
                  {codeError && (
                    <p className="mt-1 text-sm text-red-600">{codeError}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transform transition hover:-translate-y-0.5"
            >
              登录
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                或者使用
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition transform hover:-translate-y-0.5"
              >
                <span className="sr-only">使用微信登录</span>
                微信
              </a>
            </div>
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition transform hover:-translate-y-0.5"
              >
                <span className="sr-only">使用QQ登录</span>
                QQ
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            还没有账号?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;