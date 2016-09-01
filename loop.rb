while true
  `node index.js`
  `echo -EN "\x1b[H"`
  puts `clear && ./imgcat img.png`
  sleep 0.3
end

