'use client'

import type { VideoBlockProps } from './VideoBlockProps'

export const VideoBlock = ({
  src,
  type = 'video',
  width = '100%',
  height = '400px',
  alignment = 'center',
  autoplay = false,
  controls = true,
  loop = false,
  muted = false,
  poster,
  padding = '16px',
}: VideoBlockProps) => {
  const containerStyle = {
    textAlign: alignment,
    padding,
  }

  const videoStyle = {
    width,
    height,
    maxWidth: '100%',
  }

  if (type === 'youtube' || type === 'vimeo') {
    // Handle YouTube and Vimeo embeds
    const embedUrl =
      type === 'youtube'
        ? `https://www.youtube.com/embed/${src}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}&mute=${muted ? 1 : 0}`
        : `https://player.vimeo.com/video/${src}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}`

    return (
      <div style={containerStyle}>
        <iframe
          src={embedUrl}
          style={videoStyle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // Handle regular video files
  return (
    <div style={containerStyle}>
      <video
        src={src}
        style={videoStyle}
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        poster={poster}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
