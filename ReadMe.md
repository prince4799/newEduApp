# alternative way to resolve the issue but it will may not work for textInput 
import {AppRegistry,Text,TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
//TextInput.disableFullscreenUI=true
AppRegistry.registerComponent(appName, () => App);

# to resolve the font scaling   
import PixelRatio from react-native
In Text/TextInput style set your fontSize to {intendedFontSize / PixelRatio.getFontScale()}

# or you can use fontScale from useWindowDimensions()
 const {fontScale} = useWindowDimensions()
  fontSize: 30 / fontScale, // divide the font size by the font scale

# to allow scaling of the fonts
import {Text, TextInput} from "react-native";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.

## You need to think about proportion when building your UI.

# 1, Use percentage(%) for width and aspectRatio for height, or vice versa.

container: {
    width: "100%",
    aspectRatio: 10 / 3, //height will be "30%" of your width
}
# 2, Use flex for the jobs percentage can't do. For example, if you have arbitrary size of items in a list and you want them to share equal sizes. Assign each of them with flex: 1

# 3, Use rem from EStyleSheet instead of pixels. rem is a scale fator. For example, if your rem is 2 and your “11rem” will become “11*2” = “22”. If we make rem proportion to the screen sizes, your UI will scale with any screen sizes.

//we define rem equals to the entireScreenWidth / 380
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

//how to use rem
container: {
    width: "100%",
    aspectRatio: 10 / 3, //height will be "30%"
    padding: "8rem", //it'll scale depend on the screen sizes.
}
# 4, Use scrollView for contents that could potentially scale out of the boxes. For example, a TextView

# 5, Every time you think about using pixels, consider use rem in method 3.

For a detailed explanation, you can read the article here. 7 Tips to Develop React Native UIs For All Screen Sizes

## To disable display size in react native 
function App(): JSX.Element {
  const [defaultDisplaySize, setDefaultDisplaySize] = useState(Dimensions.get('window'));
  const updateDefaultDisplaySize = () => {
    setDefaultDisplaySize(Dimensions.get('window'));
  };
  useEffect(() => {
    const removeNetDisplaySubscription:any = Dimensions.addEventListener('change', updateDefaultDisplaySize);
    return () => {
      removeNetDisplaySubscription();
    };
  });