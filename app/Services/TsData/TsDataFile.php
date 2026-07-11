<?php

namespace App\Services\TsData;

abstract class TsDataFile
{
    abstract protected function path(): string;

    abstract protected function header(): string;

    /**
     * @return array<string, string|null> export name => TS type annotation (or null for untyped)
     */
    abstract protected function exports(): array;

    /**
     * @return array<string, mixed>
     */
    public function read(): array
    {
        return TsDataCodec::parse(file_get_contents($this->path()));
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function write(array $data): void
    {
        $body = '';

        foreach ($this->exports() as $name => $type) {
            $suffix = $type ? ": {$type}" : '';
            $body .= "export const {$name}{$suffix} = ".TsDataCodec::encodeValue($data[$name]).";\n\n";
        }

        file_put_contents($this->path(), rtrim($this->header())."\n\n".rtrim($body)."\n");
    }
}
