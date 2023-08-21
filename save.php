<?php
// echo "saving";
header("Content-Type:application/json");
$data = json_decode(file_get_contents("php://input"), true);
if (isset($data['html']) && isset($data['page'])) {
    // Load html content from request & convert it to utf-8
    $html = mb_convert_encoding($data['html'], 'HTML-ENTITIES', 'UTF-8');
    // $html = $data['html'];
    $doc = new DOMDocument('1.0', 'UTF-8');
    // $doc->formatOutput = true;
    $new_body = new DOMDocument('1.0', 'UTF-8');
    libxml_use_internal_errors(true);
    // var_dump($data['page'].'.html');
    // Load original file content & convert to utf-8
    $file = file_get_contents($data['page'].'.html');
    $file = mb_convert_encoding($file, 'HTML-ENTITIES', 'UTF-8');
    // $doc->loadHTML($file);
    // $new_body->loadHTML($html);
    $doc->loadHTML($file, LIBXML_HTML_NOIMPLIED);
    $new_body->loadHTML($html, LIBXML_HTML_NOIMPLIED);
    $doc->formatOutput = true;
    $new_body->formatOutput = true;
    // $doc->preserveWhiteSpace = false;
    // $new_body->preserveWhiteSpace = false;
    // Select body part from request
    $new_body = $new_body->getElementsByTagName('body')[0];
    $new_body = $doc->importNode($new_body, true);
    $new_body->setAttribute('data-barba', 'wrapper');
    // Select html node and head node
    $root = $doc->getElementsByTagName('html')[0];
    $head = $doc->getElementsByTagName('head')[0];
    // Remove all children from root
    while (isset($root->firstChild)) {
        $root->removeChild($root->firstChild);
    }
    // Restore head node and add new body
    $root->appendChild($head);
    $root->appendChild($new_body);
    libxml_clear_errors();
    // Save new contents to string
    $new_file = html_entity_decode($doc->saveXML(null, LIBXML_NOEMPTYTAG));
    
    $tidy_config = array(
        'indent'         => true,
        'output-html'   => true,
        'literal-attributes' => true,
        'drop-empty-elements' => false,
        'drop-empty-paras' => false,
        'wrap'           => 200
    );
    // $format = new Format;
    // $formatted_html = $format->HTML($new_file);
    $new_file = preg_replace('/<\?xml(.)*\?>/', '', $new_file);
    echo $new_file;
    // $tidy = new tidy;
    // $tidy->parseString($new_file, $tidy_config, 'utf8');
    // $tidy->cleanRepair();
    // echo $new_file;
    // var_dump($tidy);
    // Save to file
    // file_put_contents($data['page'].'-new.html', $tidy->value);
    echo 'Written: '.file_put_contents($data['page'].'.html', $new_file);
    // echo 'Wrote: ' . $doc->saveHTMLFile($data['page'].'-new.html') . ' bytes';
    // var_dump($new_body);
    // var_dump($new_body->getElementsByTagName('body')[0]);
    // foreach ($bodys as $body) {
    //     echo $body->nodeValue, PHP_EOL;
    // }
    // echo "Page saved successfully";
}