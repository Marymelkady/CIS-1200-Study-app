import React, { useState } from 'react';

const VideoSection = () => {
  const [videos] = useState([
    {
      id: 'video1',
      title: 'Thinking in OCaml: The Functional Programming Mindset',
      description: 'An introduction to functional programming concepts in OCaml.',
      url: 'https://www.youtube.com/embed/qKTXSh2oSDg'
    },
    {
      id: 'video2',
      title: 'Why Variables Secretly Link In Memory',
      description: 'Understanding how variables work in memory and referencing.',
      url: 'https://www.youtube.com/embed/VRPzhoBtD_U'
    },
    {
      id: 'video3',
      title: "Java's Object Oriented Architectural Blueprint",
      description: 'Overview of object-oriented architecture in Java.',
      url: 'https://www.youtube.com/embed/bvNYc5swxh0'
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Video Tutorials</h2>
      <p className="text-gray-600 mb-6">
        Watch these short videos to reinforce your understanding of key concepts.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={selectedVideo.url}
                className="w-full h-[400px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
              <p className="text-gray-600 mt-2">{selectedVideo.description}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold mb-3">Playlist</h4>
            <div className="space-y-3">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`w-full text-left p-3 rounded transition ${
                    selectedVideo.id === video.id
                      ? 'bg-blue-100 border-l-4 border-blue-500'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <p className="font-medium text-sm">{video.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {video.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-blue-700">
          💡 These short videos cover key concepts from the CIS 1200 curriculum.
        </p>
      </div>
    </div>
  );
};

export default VideoSection;
