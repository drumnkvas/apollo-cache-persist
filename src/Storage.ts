import {
  ApolloPersistOptions,
  PersistentStorage,
  PersistedData,
  SerializedData,
} from './types';

export default class Storage<T extends SerializedData> {
  storage: PersistentStorage<PersistedData<T>>;
  key: string;

  constructor(options: ApolloPersistOptions<T>) {
    const { storage, key = 'apollo-cache-persist' } = options;

    this.storage = storage;
    this.key = key;
  }

  read() {
    return this.storage.getItem(this.key);
  }

  write(data) {
    return this.storage.setItem(this.key, data);
  }

  purge() {
    return this.storage.removeItem(this.key);
  }

  async getSize(): Promise<number | null> {
    const data: PersistedData<T> = await this.storage.getItem(this.key);

    if (data == null) {
      return 0;
    } else {
      return data.length != null ? data.length : null;
    }
  }
}