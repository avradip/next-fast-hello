## Getting Started

Setup the environment:

```
poetry install
```

Open poetry shell:
```
poetry shell
```

Run the development server:

```
python main.py
```

Open http://localhost:8000/docs in browser or use curl commands to test


## Docker Support
Docker build
```
docker buildx build -t next-fast-hello:latest . --load
```
Docker run
```
docker run -p 8000:8000 next-fast-hello:latest