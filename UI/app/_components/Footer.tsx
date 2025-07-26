type FooterProps = {
  //children: React.ReactNode;
};

function Footer(_props: FooterProps) {
  return (
    <footer className="text-center py-1 bg-primary-container text-on-primary-container border-t border-on-primary-container/40">
      <span className="font-semibold text-xs">
        &copy; 2025 Craig McLellen. All rights reserved.
      </span>
    </footer>
  );
}

export default Footer;
