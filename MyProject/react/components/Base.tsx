import { useAppConfig } from "hooks/useAppConfig";
import React, { ReactNode } from "react";
import Loader from "./Loader";

type Props = {
  children: ReactNode;
};

const Base = (props: Props) => {
  const { isLoading } = useAppConfig();
  return <>{isLoading ? <Loader /> : props.children}</>;
};

export default Base;
