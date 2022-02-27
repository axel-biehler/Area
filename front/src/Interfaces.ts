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

interface IParameter {
  name: string;
  type: string;
  placeholder?: string;
  value?: any;
}

interface IWidget {
  name: string;
  displayName: string;
  description: string;
  params: IParameter[];
}

interface IAction {
  name: string;
  displayName: string;
  description: string;
  needsOauth: string;
  widgets: IWidget[];
}

interface IServiceListItem {
  value: string;
  label: string;
  description: string;
  widgets: IWidget[];
  isDisabled?: boolean;
}

interface IEventListItem {
  value: string;
  label: string;
  description: string;
  parameters: IParameter[];
}

interface IListParamsProps {
  event: IEventListItem;
  editParams: (edit: IParameter, value: any) => void;
}

interface IParameterProps {
  index: number;
  element: IParameter;
  editParams: (edit: IParameter, value: any) => void;
}

interface IInstanceConfig {
  name: string;
  serviceName: string;
  displayName: string;
  webhookId?: string;
  params: IParameter[];
}

interface IInstance {
  action?: IInstanceConfig;
  reaction?: IInstanceConfig;
}

interface IServiceChoiceProps {
  servicesList: IServiceListItem[];
  editInstance: (type: string, config: IInstanceConfig) => void;
  type: string;
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
  IParameter,
  IWidget,
  IAction,
  IServiceListItem,
  IEventListItem,
  IListParamsProps,
  IParameterProps,
  IInstanceConfig,
  IInstance,
  IServiceChoiceProps
};
