<?php

namespace App\Services\TsData;

use JsonException;

/**
 * Encodes/decodes the `export const NAME[: Type] = <json>;` blocks that make up
 * a canonical TS data file. Every value is valid JSON (double-quoted keys/strings
 * are legal TypeScript object-literal syntax), so PHP never needs a real JS parser.
 */
class TsDataCodec
{
    private const JSON_FLAGS = JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE;

    /**
     * @return array<string, mixed> export name => decoded value
     *
     * @throws JsonException
     */
    public static function parse(string $contents): array
    {
        preg_match_all(
            '/^export const (\w+)(?:\s*:[^=\n]*)?\s*=\s*(.*?);\s*(?=export const |\z)/ms',
            $contents,
            $matches,
            PREG_SET_ORDER,
        );

        $data = [];

        foreach ($matches as $match) {
            $data[$match[1]] = json_decode(trim($match[2]), associative: true, flags: JSON_THROW_ON_ERROR);
        }

        return $data;
    }

    /**
     * @throws JsonException
     */
    public static function encodeValue(mixed $value): string
    {
        return json_encode($value, self::JSON_FLAGS | JSON_THROW_ON_ERROR);
    }
}
