import Home from "./components/Home";
const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100py-8 px-4">

      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">AI Image Enhancer{" "}</h1>
        <p className="text-lg text-gray-500">Upload an image to enhance it's quality using AI.</p>
      </div>
    
      <Home />


      <div className="text-sm text-gray-500 mt-6"> Powered By @S7T-AI</div>
    </div>
  );
}

export default App;
