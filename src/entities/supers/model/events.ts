import { createEvent } from 'effector';

// 🔹 Event: forma submit
export const formSubmitted = createEvent<{
   name: string;
   isVillain: boolean;
}>();
// 🔹 Event: appStarted event
export const appStarted = createEvent<void>();
