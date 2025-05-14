import { sample } from 'effector';
import { addSuperFx, deleteSuperFx, fetchSupersFx } from './effects';
import { appStarted, formSubmitted } from './events';

// 🔹 sample: forma yuborilsa, addSuperFx ishlaydi
sample({
   clock: formSubmitted,
   target: addSuperFx,
});
// 🔹 sample: appStarted event kelganda, fetchSupersFx ishlaydi
sample({
   clock: appStarted,
   target: fetchSupersFx,
});

// 🔹 sample: super o‘chirilib bo‘lgach, fetchSupersFx ishlaydi
sample({
   clock: deleteSuperFx.doneData,
   target: fetchSupersFx,
});
