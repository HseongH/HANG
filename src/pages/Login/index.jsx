import React from 'react';
// form
import { Formik } from 'formik';
import * as yup from 'yup';
// elements
import {
  Logo,
  Grid,
  Button,
  Label,
  Link,
  Text,
  Input,
} from '../../elements/index';
// image
import LogoImg from '../../Images/Logo.png';

const Login = () => {
  return (
    <>
      <Grid height="300px" position="relative">
        <Logo width="169px" height="162px" imgUrl={LogoImg} />
      </Grid>

      <Formik
        initialValues={{ userId: '', password: '' }}
        validationSchema={yup.object({
          userId: yup.string().required(),
          password: yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Grid margin="0 0 30px">
              <Label id="userId" lh="2" fs="lg" fw="semiBold">
                아이디
              </Label>

              <Input
                id="userId"
                placeholder="아이디를 입력하세요"
                {...formik.getFieldProps('userId')}
              />
            </Grid>

            <Grid>
              <Label id="password" lh="2" fs="lg" fw="semiBold">
                비밀번호
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                {...formik.getFieldProps('password')}
              />
            </Grid>

            <Text fs="sm" margin="12px 8px 0" color="danger">
              가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
            </Text>

            <Grid position="absolute" bottom="20px" left="0">
              <Button fs="la" fw="bold" type="submit" width="100%">
                로그인
              </Button>

              <Grid>
                <Link
                  href="/find"
                  width="50%"
                  padding="17px 0"
                  fs="sm"
                  hoz="center"
                  color="darkG"
                >
                  아이디 / 비밀번호 찾기
                </Link>

                <Link
                  href="/signup"
                  width="50%"
                  padding="17px 0"
                  fs="sm"
                  hoz="center"
                  color="darkG"
                >
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
