import { Observable } from 'rxjs';
export interface INgxBootstrapModalInstance {
  shown: Promise<void>;
  hidden: Promise<void>;
  events: Observable<Event>;
  hide: () => Promise<void>;
  handleUpdate: () => void;
}
