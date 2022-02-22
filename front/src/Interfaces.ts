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

interface IServicesListProps {
  infos: IProfileData;
  setInfos: React.Dispatch<React.SetStateAction<IProfileData>>;
}

interface IGithubEnv {
  status: boolean,
  scope: string,
  clientId: string,
  state: string,
}

interface IFormProps {
  handleClose: any;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

interface IProfileData {
  "username": string;
  "email": string;
  "twitterLinked": boolean;
  "githubLinked": boolean;
  "trelloLinked": boolean;
}

interface ITrelloAuth {
  status: boolean;
  redirectUrl?: string;
  error?: string;
}

export type {
  IStatusResponse,
  IAuthResponse,
  IServicesListProps,
  IGithubEnv,
  IFormProps,
  IProfileData,
  ITrelloAuth
};