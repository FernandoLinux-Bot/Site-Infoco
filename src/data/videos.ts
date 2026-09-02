/**
 * Vídeos do SICC hospedados no Mux.
 *
 * `id` é o **Playback ID**, não o Asset ID — são coisas diferentes no Mux, e o
 * Asset ID responde 400 em image.mux.com e stream.mux.com. O Playback ID fica
 * na aba "Playback and Thumbnails" do painel do asset.
 *
 * Os masters são verticais (9:16). O carrossel respeita essa proporção em vez
 * de recortar para 16:9 — foi o recorte que distorcia o rosto e cortava as
 * legendas queimadas.
 */
export type Video = {
    id: string;
    titulo: string;
    descricao: string;
    /** Segundo do vídeo usado como capa. */
    posterEm: number;
};

export const VIDEOS: Video[] = [
    {
        id: '8WgXwrn2oB7Yiz02D9hxvvReuNBZxqMQkshik9NZxVQE',
        titulo: 'O SICC por dentro',
        descricao: 'Como uma demanda nasce, tramita pelas análises e vira contrato.',
        posterEm: 2,
    },
    {
        // Asset "uilber_etp" no Mux. Este é o Playback ID; o Asset ID do painel
        // (g8HAm8yHHiPBPr…) responde 400 e não serve aqui.
        id: 'mRU02MnyABmk02PnYbHiSTZ5kpmZBm1DqdNvClG020049QY',
        titulo: 'A importância do planejamento',
        descricao: 'Por que o estudo técnico decide o resultado da contratação antes do edital.',
        posterEm: 3,
    },
];

/** Só entram no carrossel os vídeos com Playback ID preenchido. */
export const VIDEOS_PUBLICADOS = VIDEOS.filter(v => v.id.trim().length > 0);
