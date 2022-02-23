import React from "react";

interface IStatusResponse {
  status: boolean;
  error?: string;
}

interface IAuthResponse {
  status: boolean;
  error?: string;
  token?: string;
}

interface IGithubEnv {
  status: boolean;
  scope: string;
  clientId: string;
  state: string;
}

interface IFormProps {
  handleClose: any;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

interface IProfileData {
  username: string;
  email: string;
  twitterLinked: boolean;
  githubLinked: boolean;
  trelloLinked: boolean;
}

interface IProfileProps {
  infos: IProfileData;
  setInfos: React.Dispatch<React.SetStateAction<IProfileData>>;
}

interface ITrelloOAuth {
  status: boolean;
  redirectUrl?: string;
  error?: string;
}

interface ITwitterOAuth {
  status: boolean;
  oauthToken?: string;
  error?: string;
}

interface IAccountSettings {
  username?: string;
  password?: string;
  email?: string;
}

export type {
  IStatusResponse,
  IAuthResponse,
  IProfileProps,
  IGithubEnv,
  IFormProps,
  IProfileData,
  ITrelloOAuth,
  ITwitterOAuth,
  IAccountSettings,
};
