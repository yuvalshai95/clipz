import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
// Modal service to help manage all modals in the app, only one modal should be open at all moments.
export class ModalService {
  private modals: IModal[] = [];

  constructor() {}

  register(id: string) {
    this.modals.push({ id, visible: false });
  }

  // for fixing memory leak (so our service wont handle unregistered modals)
  unregister(id: string) {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  isModalOpen(id: string): boolean {
    // Method 1: to solve ts error for returning undefined
    // Boolean(this.modals.find((modal) => modal.id === id)?.visible)

    // Method 2:
    return !!this.modals.find((modal) => modal.id === id)?.visible;
  }

  toggleModal(id: string) {
    const modal = this.modals.find((modal) => modal.id === id);
    if (modal) modal.visible = !modal.visible;
  }
}
