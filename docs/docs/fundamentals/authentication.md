---
sidebar_position: 1
---

# Authentication

## Introduction

This guide will explain how the authentication works in ABP React.

## NextAuth.js

NextAuth.js is a library that provides authentication for Next.js applications. It supports multiple authentication providers. We will use it to handle the authentication in ABP React. You can find more details about NextAuth.js [here](https://next-auth.js.org/).

## Authentication Flow

The authentication flow is as follows:

1. The user clicks on the login button.
2. The user is redirected to the login page.
3. The user enters the credentials and clicks on the login button.
4. The user is redirected to the callback page.
5. The user is redirected to the home page.

This flow is the same for all the authentication providers. We will setup a custom authentication provider in the next-auth because there is no provider for OpenIddict yet. You can find more details about the authentication flow [here](https://next-auth.js.org/getting-started/client#authentication-flow).

## OpenID Connect

To set up the authentication, you need to set up an OpenID Connect server.
Abp Application uses [OpenIddict](https://github.com/openiddict/openiddict-core) for authentication. You have to create an client with the authorization code flow. Make sure to set the redirect uri to `http://localhost:3000/api/auth/callback/openiddict`. You can find more details about the OpenIddict configuration [here](https://docs.abp.io/en/abp/latest/Authentication/OpenId-Connect).

## NextAuth.js Configuration

NextAuth.js is configured in the `/pages/api/auth/[...nextauth].ts` api endpoint. You can find the file in the api directory of the abp app folder. You can find more details about the configuration [here](https://next-auth.js.org/configuration/initialization).
