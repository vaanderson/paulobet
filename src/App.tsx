// routes
import Router from './routes';
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

const App =()=> {


  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}

export default App