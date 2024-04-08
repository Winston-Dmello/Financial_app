import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./Theme";

export default function Home() {
    const { colors } = useContext(ThemeContext);
    console.log(colors)
    const styles = {
      color: colors.text,
    };
  
    return <div style={styles}>This text uses the theme color.</div>;
  }
  