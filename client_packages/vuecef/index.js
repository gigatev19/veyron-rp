mp.events.add('showLogin', () => {
    mp.gui.chat.push("✅ showLogin called");
    const browser = mp.browsers.new('package://vuecef-build/index.html');
  });
  