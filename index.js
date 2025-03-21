import { AppRegistry, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';

AppRegistry.registerComponent('YourAppName', () => () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
)); 