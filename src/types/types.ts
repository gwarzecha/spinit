export interface ArtistCredit {
  name: string;
}

export interface Media {
  format: string;
  'disc-count': number;
  'track-count': number;
}

export interface AlbumRelease {
  id: string;
  title: string;
  'artist-credit': ArtistCredit[];
  media: Media[];
}

export interface SearchResults {
  releases: AlbumRelease[];
}

export interface ResultsState {
  releases: AlbumRelease[] | null;
}
