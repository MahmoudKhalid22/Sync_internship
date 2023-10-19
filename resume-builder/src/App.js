import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import Form from "./components/form/Form";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
    },
    {
      path: "/resume",
      element: <Form />,
    },
  ]);

  return <RouterProvider router={router} />;
};
// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Form />
//     </div>

//   );
// }

export default App;
