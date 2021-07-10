import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

const VideoPlayer: React.FC<{ uri: string }> = ({ uri }): JSX.Element => {
  const video = React.useRef<Video>(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus | any>();
  return (
    <View 
      style={styles.container}
    >
      <Video
        ref={video}
        style={styles.video}
        source={{uri}}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        rate={1}
      />
      <View style={styles.buttons}>
        <Button
          title={status?.isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (video?.current) {
              console.log(status);
              status?.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }

          }}
        />
        <Button
          title={status?.isMuted ? 'Un-Mute' : 'Mute'}
          onPress={() => {
            if (video?.current) {
              video.current.setIsMutedAsync(!(status?.isMuted));
            }
          }}
        />
        <Button
          title={'x ' + status?.rate}
          onPress={() => {
            if (video?.current && status) {
              if (status.rate >= 2) {
                video.current.setRateAsync(0.25, true);
              } else {
                const rate = Math.min(status.rate + 0.25, 2);
                video.current.setRateAsync(rate, rate !== 1);
              }
              
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPlayer;