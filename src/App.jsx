import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <AppRouter />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
