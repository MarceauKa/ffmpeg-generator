export default {
    CODECS_VIDEO: {
        'h264': 'H.264 (libx264)',
        'h265': 'H.265 (libx265)',
        'hevc': 'HEVC (libx265)',
        'flv1': 'FLV (flv)',
        'mjpeg': 'Motion JPEG (mjpeg)',
        'mpeg2video': 'MPEG-2 video (mpeg2video)',
        'mpeg4': 'MPEG-4 part 2 (libxvid)',
        'mov': 'QuickTime (mov)',
        'theora': 'Theora (libtheora)',
        'vp8': 'VP8 (libvpx)',
        'vp9': 'Google VP9 (libvpx-vp9)',
        'vcd': 'MPEG-1 Systems (vcd)',
        'vob': 'MPEG-2 PS (vob)',
        'webp': 'WebP (webp)',
        'y41p': '4:1:1 (yuv)',
        'yuv4': '4:2:0 (yuv4)',
    },
    CODECS_AUDIO: {
        'aac': 'AAC (aac)',
        'ac3': 'AC3 (ac3)',
        'alac': 'ALAC (alac)',
        'dts': 'DTS Coherent Acoustics (dca)',
        'eac3': 'E-AC3 (eac3)',
        'mp2': 'MPEG audio layer 2 (mp2)',
        'mp3': 'MPEG audio layer 3 (libmp3lame)',
        'opus': 'OPUS (libopus)',
        'truehd': 'TrueHD (truehd)',
        'vorbis': 'Vorbis (libvorbis)',
    },
    CODECS_SUBTITLE: {
        'ass': 'ASS (ass)',
        'dvb_subtitle': 'DVB subtitles (dvbsub)',
        'dvd_subtitle': 'DVD subtitles (dvdsub)',
        'hdmv_pgs_subtitle': 'HDMV PGS(pgssub)',
        'srt': 'SubRip (srt)',
        'ssa': 'SubStation Alpha (ssa)',
    },
    ENCODERS: {
        'h264': 'libx264',
        'h265': 'libx265',
        'hevc': 'libx265',
        'mpeg4': 'libxvid',
        'theora': 'libtheora',
        'vp8': 'libvpx',
        'vp9': 'libvpx-vp9',
        'mp3': 'libmp3lame',
        'opus': 'libopus',
        'vorbis': 'libvorbis',
        'hdmv_pgs_subtitle': 'pgssub',
    },
    EXAMPLE: '{\n' +
        '  "streams": [\n' +
        '    {\n' +
        '      "index": 0,\n' +
        '      "codec_name": "h264",\n' +
        '      "codec_long_name": "H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10",\n' +
        '      "profile": "High",\n' +
        '      "codec_type": "video",\n' +
        '      "codec_time_base": "1/50",\n' +
        '      "codec_tag_string": "avc1",\n' +
        '      "codec_tag": "0x31637661",\n' +
        '      "width": 640,\n' +
        '      "height": 360,\n' +
        '      "coded_width": 640,\n' +
        '      "coded_height": 368,\n' +
        '      "has_b_frames": 2,\n' +
        '      "sample_aspect_ratio": "1:1",\n' +
        '      "display_aspect_ratio": "16:9",\n' +
        '      "pix_fmt": "yuv420p",\n' +
        '      "level": 30,\n' +
        '      "chroma_location": "left",\n' +
        '      "refs": 4,\n' +
        '      "is_avc": "true",\n' +
        '      "nal_length_size": "4",\n' +
        '      "r_frame_rate": "25/1",\n' +
        '      "avg_frame_rate": "25/1",\n' +
        '      "time_base": "1/12800",\n' +
        '      "start_pts": 0,\n' +
        '      "start_time": "0.000000",\n' +
        '      "duration_ts": 1352704,\n' +
        '      "duration": "105.680000",\n' +
        '      "bit_rate": "308236",\n' +
        '      "bits_per_raw_sample": "8",\n' +
        '      "nb_frames": "2642",\n' +
        '      "disposition": {\n' +
        '        "default": 1,\n' +
        '        "dub": 0,\n' +
        '        "original": 0,\n' +
        '        "comment": 0,\n' +
        '        "lyrics": 0,\n' +
        '        "karaoke": 0,\n' +
        '        "forced": 0,\n' +
        '        "hearing_impaired": 0,\n' +
        '        "visual_impaired": 0,\n' +
        '        "clean_effects": 0,\n' +
        '        "attached_pic": 0\n' +
        '      },\n' +
        '      "tags": {\n' +
        '        "language": "und",\n' +
        '        "handler_name": "VideoHandler"\n' +
        '      }\n' +
        '    },\n' +
        '    {\n' +
        '      "index": 1,\n' +
        '      "codec_name": "aac",\n' +
        '      "codec_long_name": "AAC (Advanced Audio Coding)",\n' +
        '      "profile": "LC",\n' +
        '      "codec_type": "audio",\n' +
        '      "codec_time_base": "1/48000",\n' +
        '      "codec_tag_string": "mp4a",\n' +
        '      "codec_tag": "0x6134706d",\n' +
        '      "sample_fmt": "fltp",\n' +
        '      "sample_rate": "48000",\n' +
        '      "channels": 2,\n' +
        '      "channel_layout": "stereo",\n' +
        '      "bits_per_sample": 0,\n' +
        '      "r_frame_rate": "0/0",\n' +
        '      "avg_frame_rate": "0/0",\n' +
        '      "time_base": "1/48000",\n' +
        '      "start_pts": 0,\n' +
        '      "start_time": "0.000000",\n' +
        '      "duration_ts": 5073920,\n' +
        '      "duration": "105.706667",\n' +
        '      "bit_rate": "126438",\n' +
        '      "max_bit_rate": "128000",\n' +
        '      "nb_frames": "4955",\n' +
        '      "disposition": {\n' +
        '        "default": 1,\n' +
        '        "dub": 0,\n' +
        '        "original": 0,\n' +
        '        "comment": 0,\n' +
        '        "lyrics": 0,\n' +
        '        "karaoke": 0,\n' +
        '        "forced": 0,\n' +
        '        "hearing_impaired": 0,\n' +
        '        "visual_impaired": 0,\n' +
        '        "clean_effects": 0,\n' +
        '        "attached_pic": 0\n' +
        '      },\n' +
        '      "tags": {\n' +
        '        "language": "eng",\n' +
        '        "handler_name": "SoundHandler"\n' +
        '      }\n' +
        '    }\n' +
        '  ],\n' +
        '  "format": {\n' +
        '    "filename": "example.mp4",\n' +
        '    "nb_streams": 2,\n' +
        '    "nb_programs": 0,\n' +
        '    "format_name": "mov,mp4,m4a,3gp,3g2,mj2",\n' +
        '    "format_long_name": "QuickTime / MOV",\n' +
        '    "start_time": "0.000000",\n' +
        '    "duration": "105.707000",\n' +
        '    "size": "5821755",\n' +
        '    "bit_rate": "440595",\n' +
        '    "probe_score": 100,\n' +
        '    "tags": {\n' +
        '      "major_brand": "isom",\n' +
        '      "minor_version": "512",\n' +
        '      "compatible_brands": "isomiso2avc1mp41",\n' +
        '      "encoder": "Lavf54.36.100"\n' +
        '    }\n' +
        '  }\n' +
        '}',
    LANGS: {
        'ara': 'Arabic',
        'bel': 'Belarusian',
        'bul': 'Bulgarian',
        'chi': 'Chinese',
        'cze': 'Czech',
        'dan': 'Danish',
        'deu': 'German',
        'eng': 'English',
        'fin': 'Finnish',
        'fre': 'French',
        'heb': 'Hebrew',
        'hin': 'Hindi',
        'ind': 'Indonesian',
        'jpn': 'Japanese',
        'kor': 'Korean',
        'lat': 'Latin',
        'pol': 'Polish',
        'rus': 'Russian',
        'spa': 'Spanish',
        'srp': 'Serbian',
        'swe': 'Swedish',
        'tha': 'Thai',
        'vie': 'Vietnamese',
        'und': 'Undetermined'
    },
}
