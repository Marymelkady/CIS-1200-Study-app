import React from 'react';

const OCamlIDE = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">OCaml Playground</h2>
      <p className="text-gray-600 mb-6">
        Write and run OCaml code using the official TryOCaml environment.
      </p>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <iframe 
          src="https://try.ocamlpro.com/" 
          className="w-full h-[700px] border-0"
          title="TryOCaml"
          allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
      
      <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-blue-700">
          All code runs in a sandboxed environment.
        </p>
      </div>
    </div>
  );
};

export default OCamlIDE;
