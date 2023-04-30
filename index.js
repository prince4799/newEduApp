/**
 * @format
 */
import {AppRegistry,Text,TextInput,Dimensions} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.disableFullscreenUI=true
AppRegistry.registerComponent(appName, () => App);
