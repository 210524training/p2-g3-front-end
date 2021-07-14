import { MediaHeader } from '.';

export const re = /^<(img|video):(.*)>$/g;
export type MediaAndUri = {
  mediaType: MediaHeader,
  uri: string,
};

const extractHeaderAndURL = (headerUrl: string): MediaAndUri | undefined => {
  console.log(headerUrl);
  // const matches = headerUrl.matchAll(re);
  const match = re.exec(headerUrl);
  console.log(match);
  if (match) {
    const mediaType = match[1];
    const uri = match[2];
    console.log('extracted:', mediaType, uri);

    if (mediaType && uri) {
      switch (mediaType) {
      case 'img':
        return {
          mediaType: MediaHeader.IMAGE, uri
        };
      case 'video':
        return {
          mediaType: MediaHeader.VIDEO, uri
        };
      }
      console.error('Chatapredu: Detected a media but no component was available for that media type', { mediaType, uri });
    }
  }
  return undefined;
};

export default extractHeaderAndURL;