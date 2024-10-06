export type AlbumModel = {
  artists: [
    {
      name: string;
    }
  ];
  externalUrls: {
    externalUrls: {
      spotify: string;
    };
  };
  id: string;
  images: [
    {
      height: number;
      url: string;
      width: number;
    }
  ];
  name: string;
  releaseDate: string;
  value: number;
};
