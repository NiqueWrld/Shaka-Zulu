<!DOCTYPE html>
<html lang="en">

<body>
  <button id="record-button">Initializing...</button>
  <script type="module" src="record.js"></script>
  <script>
    const wsUrl = "ws://10.3.100.190:3000";
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
    };

    ws.onclose = () => {
        console.log("Disconnected from the WebSocket server");
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

  </script>
</body>

</html>
