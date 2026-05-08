export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8 md:py-8 space-y-5 animate-fade-in">
      <div className="border-b border-border pb-4">
        <h1 className="text-[22px] font-semibold tracking-tight">Settings</h1>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Workspace and account preferences
        </p>
      </div>

      <section className="rounded-[8px] border border-border bg-card">
        <header className="border-b border-border px-4 py-2.5">
          <h3 className="text-[13px] font-semibold tracking-tight">Profile</h3>
        </header>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 px-4 py-4 text-[13px]">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Name</dt>
            <dd className="mt-0.5 font-medium">Dr. Eleanor Chen</dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Specialty</dt>
            <dd className="mt-0.5 font-medium">Nephrology</dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Clinic</dt>
            <dd className="mt-0.5 font-medium">Bay Area Nephrology &amp; Hypertension</dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">NPI</dt>
            <dd className="mt-0.5 font-medium tabular-nums">1234567890</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-[8px] border border-border bg-card">
        <header className="border-b border-border px-4 py-2.5">
          <h3 className="text-[13px] font-semibold tracking-tight">Notifications</h3>
        </header>
        <p className="px-4 py-4 text-[12px] text-muted-foreground">
          Notification preferences will appear here in the next release.
        </p>
      </section>
    </div>
  );
}
