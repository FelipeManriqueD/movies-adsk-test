import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
