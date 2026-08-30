// Loki-inspired theme intentionally disables audio feedback.
class SoundEngine {
  private enabled: boolean = false;

  public setEnabled(val: boolean) {
    this.enabled = false;
  }

  public isEnabled(): boolean {
    return false;
  }

  public playKey() {}
  public playHover() {}
  public playClick() {}
  public playWebShoot() {}
  public playSuccess() {}
}

export const sound = new SoundEngine();
