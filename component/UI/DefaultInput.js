import React from 'react';
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
    <TextInput
        underlineColorAndroid= "transparent"
        ref={input => { this.textInput = input }}
        {...props}
        style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
    />
);


const styles = StyleSheet.create({
    invalid: {
        borderBottomColor: "red"
    },
    input: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#000",
        padding: 5,
        marginTop: 8,
        marginBottom: 8
      },
  });




export default defaultInput;
