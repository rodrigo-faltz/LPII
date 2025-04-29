# run_servers.py
import subprocess
import sys
import time
from threading import Thread

def run_command(command, cwd):
    """Run a command in a specific directory"""
    try:
        process = subprocess.Popen(
            command,
            cwd=cwd,
            shell=True,
            stdout=sys.stdout,
            stderr=sys.stderr
        )
        process.wait()
    except KeyboardInterrupt:
        process.terminate()

if __name__ == "__main__":
    # Define commands and directories
    commands = [
        {'command': 'npm run dev', 'cwd': 'back'},
        {'command': 'npm run dev', 'cwd': 'front'}
    ]

    # Create and start threads
    threads = []
    for cmd in commands:
        thread = Thread(target=run_command, args=(cmd['command'], cmd['cwd']))
        thread.daemon = True
        threads.append(thread)
        thread.start()

    try:
        # Keep main thread alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping servers...")
        sys.exit(0)