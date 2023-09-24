import multiprocessing

bind = "0.0.0.0:8000"

workers = multiprocessing.cpu_count() * 2 + 1

max_requests = 1000

max_requests_jitter = 50

worker_class = "sync"

daemon = False

accesslog = "-" 

errorlog = "-"  

loglevel = "info"

timeout = 30

keepalive = 2

worker_connections = 1000

preload_app = True