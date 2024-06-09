import { useRouteError } from 'react-router-dom';

import React from 'react'

import PageContent from '../components/Error/PageContent';
import MainNavigation from '../MainNavigation/MainNavigation'

const ErrorPage = () => {
  const error = useRouteError();

  let title = 'An error occured!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource of page.'
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}

export default ErrorPage;