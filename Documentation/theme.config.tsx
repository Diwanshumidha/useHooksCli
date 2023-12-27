import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Icon from "./components/Logo";

const config: DocsThemeConfig = {
  logo: <span style={{display:"flex", justifyContent:"center", alignItems:"center"}}> <Icon fill='white' /> Use Hooks Cli</span>,
  project: {
    link: "https://github.com/Diwanshumidha/useHooksCli",
  },
  docsRepositoryBase: "https://github.com/Diwanshumidha/useHooksCli",
  useNextSeoProps() {
    return {
      titleTemplate: "%s – useHooks",
    };
  },
  footer: {
    component: false,
  },
};

export default config;
