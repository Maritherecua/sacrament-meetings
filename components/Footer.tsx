import type { ReactElement } from "react";

export function Footer(): ReactElement {
  return (
    <footer className="site-footer flex justify-between gap-4">
      <span>Bella Vista Ward</span>
      <span>Meetinghouse · 184 Oak Street</span>
    </footer>
  );
}
