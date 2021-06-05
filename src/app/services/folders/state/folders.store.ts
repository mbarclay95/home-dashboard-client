import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Folder } from '../../../models/folder.model';

export interface FoldersState extends EntityState<Folder> {
  editMode: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'folders' })
export class FoldersStore extends EntityStore<FoldersState> {

  constructor() {
    super({editMode: false});
  }

}
