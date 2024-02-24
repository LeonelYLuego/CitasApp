import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from './member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<
  MemberEditComponent
> = (component) => {
  if (component.editForm?.dirty)
    return confirm(
      'Se perderán los cambios si sales de esta página ¿deseas continuar?'
    );
  return true;
};
