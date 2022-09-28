declare module '@emoji-mart/react';

declare interface AppInterface {
  cable?: ActionCable.Cable | undefined;
}
declare let App: AppInterface;

declare module 'actioncable' {
  export = ActionCable;
}
